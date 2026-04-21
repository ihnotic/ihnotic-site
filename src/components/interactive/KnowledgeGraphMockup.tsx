import { startTransition, useEffect, useState, type CSSProperties } from "react";

import {
  edges,
  lanes,
  nodes,
  timeline,
  type LaneId,
} from "../../content/mock-graph";

interface GraphState {
  lane: LaneId;
  nodeId: string;
}

const defaultState: GraphState = {
  lane: "fabric-architecture",
  nodeId: "fabric.supernode",
};

function parseHash(hash: string): GraphState {
  const params = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash);
  const lane = params.get("lane") as LaneId | null;
  const nodeId = params.get("node");

  return {
    lane: lanes.some((entry) => entry.id === lane) ? lane! : defaultState.lane,
    nodeId: nodes.some((entry) => entry.id === nodeId) ? nodeId! : defaultState.nodeId,
  };
}

function formatHash(next: GraphState): string {
  const params = new URLSearchParams();
  params.set("lane", next.lane);
  params.set("node", next.nodeId);
  return `#${params.toString()}`;
}

function hexToRgbTriplet(hex: string): string {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : normalized;

  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);

  return `${red} ${green} ${blue}`;
}

export function KnowledgeGraphMockup() {
  const [state, setState] = useState<GraphState>(defaultState);

  useEffect(() => {
    const syncFromHash = () => {
      startTransition(() => {
        setState(parseHash(window.location.hash));
      });
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const activeNode =
    nodes.find((node) => node.id === state.nodeId) ??
    nodes.find((node) => node.id === defaultState.nodeId)!;
  const activeLane =
    lanes.find((lane) => lane.id === state.lane) ??
    lanes.find((lane) => lane.id === defaultState.lane)!;
  const neighborIds = new Set(
    edges.flatMap((edge) =>
      edge.source === activeNode.id
        ? [edge.target]
        : edge.target === activeNode.id
          ? [edge.source]
          : [],
    ),
  );
  const relatedNodes = nodes.filter((node) => neighborIds.has(node.id));
  const focusEdges = edges
    .filter((edge) => edge.source === activeNode.id || edge.target === activeNode.id)
    .map((edge) => {
      const relatedId = edge.source === activeNode.id ? edge.target : edge.source;
      const relatedNode = nodes.find((node) => node.id === relatedId)!;

      return {
        id: `${edge.source}-${edge.target}`,
        relation: edge.relation,
        node: relatedNode,
      };
    });

  const pushState = (next: GraphState) => {
    startTransition(() => {
      setState(next);
    });
    window.history.replaceState(null, "", formatHash(next));
  };

  return (
    <div className="board-shell min-h-screen">
      <header className="border-hairline-bottom sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 bg-[rgba(244,241,232,0.88)] px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-trace)]/12 text-[10px] font-semibold uppercase tracking-[0.32em] text-[var(--color-trace)]">
            ih
          </div>
          <div>
            <p className="font-display text-lg tracking-[0.2em] text-[var(--color-graphite)] uppercase">
              ihnotic.com
            </p>
            <p className="text-secondary font-mono text-[11px] uppercase tracking-[0.24em]">
              issue #1 / knowledge graph mockup
            </p>
          </div>
        </div>

        <div className="hidden md:block">
          <p className="text-secondary font-mono text-[11px] uppercase tracking-[0.24em]">
            single DOM route / focus workspace
          </p>
        </div>
      </header>

      <main className="md:grid md:min-h-[calc(100vh-4rem)] md:grid-cols-[14rem_minmax(0,1fr)_15rem] lg:grid-cols-[19rem_minmax(0,1fr)_20rem]">
        <aside className="panel-surface border-hairline-bottom border-hairline-right px-4 py-5 sm:px-6 md:overflow-y-auto md:py-6">
          <div className="space-y-6">
            <div className="space-y-2">
              {lanes.map((lane) => {
                const count = nodes.filter((node) => node.lane === lane.id).length;
                const isActive = lane.id === activeLane.id;

                return (
                  <button
                    key={lane.id}
                    type="button"
                    onClick={() => {
                      const preferredNode =
                        nodes.find((node) => node.lane === lane.id && node.id === activeNode.id) ??
                        nodes.find((node) => node.lane === lane.id)!;

                      pushState({
                        lane: lane.id,
                        nodeId: preferredNode.id,
                      });
                    }}
                    className={`group flex w-full items-start justify-between gap-4 border-b border-[rgba(31,42,51,0.08)] py-3 text-left transition ${
                      isActive
                        ? "topic-area-active text-[var(--color-graphite)]"
                        : "text-secondary hover:text-[var(--color-graphite)]"
                    }`}
                    style={
                      isActive
                        ? ({
                            "--topic-glow-rgb": hexToRgbTriplet(lane.accent),
                          } as CSSProperties)
                        : undefined
                    }
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-mono text-[11px] uppercase tracking-[0.28em]"
                          style={{ color: lane.accent }}
                        >
                          {lane.shorthand}
                        </span>
                        <span className="font-display text-base leading-none lg:text-[1.05rem]">{lane.label}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs">{String(count).padStart(2, "0")}</span>
                      <p className="text-secondary mt-1 font-mono text-[10px] uppercase tracking-[0.18em]">
                        artifacts
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="relative border-b border-[rgba(31,42,51,0.08)] px-4 py-4 sm:px-6 sm:py-5 md:border-b-0 md:border-r md:border-[rgba(31,42,51,0.08)] md:px-5 md:py-5">
          <div className="graph-stage relative overflow-hidden">
            <div className="graph-surface absolute inset-0 opacity-80" />
            <div className="relative z-10 flex flex-col gap-6 p-4 sm:p-6">
              <div className="flex flex-col gap-3 border-b border-[rgba(31,42,51,0.08)] pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                  <p className="text-secondary font-mono text-[10px] uppercase tracking-[0.28em] sm:text-[11px]">
                    Current focus frame
                  </p>
                  <h2 className="font-display text-2xl leading-none text-[var(--color-graphite)] sm:text-3xl">
                    {activeNode.focusLabel}
                  </h2>
                  <p className="text-secondary max-w-2xl text-sm leading-6">{activeNode.summary}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="signal-pill">{activeLane.label}</span>
                  <span className="signal-pill">{relatedNodes.length} linked artifacts</span>
                  <span className="signal-pill">{focusEdges.length} active relations</span>
                </div>
              </div>

              <article className="focus-card space-y-5">
                <div className="flex flex-col gap-4 border-b border-[rgba(31,42,51,0.08)] pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-3">
                    <p
                      className="font-mono text-[11px] uppercase tracking-[0.28em]"
                      style={{ color: activeLane.accent }}
                    >
                      {activeNode.eyebrow}
                    </p>
                    <h3 className="font-display text-3xl leading-[0.95] text-[var(--color-graphite)] sm:text-4xl">
                      {activeNode.title}
                    </h3>
                  </div>
                  <span className="signal-pill">{activeNode.status}</span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {activeNode.metrics.map((metric) => (
                    <div key={metric.label} className="focus-metric">
                      <p className="text-secondary font-mono text-[11px] uppercase tracking-[0.22em]">
                        {metric.label}
                      </p>
                      <p className="font-display mt-2 text-3xl leading-none text-[var(--color-graphite)]">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {activeNode.detail.map((detail) => (
                    <div key={detail} className="focus-note">
                      <p className="text-secondary text-sm leading-6">{detail}</p>
                    </div>
                  ))}
                </div>
              </article>

              <div className="space-y-4">
                <div className="border-b border-[rgba(31,42,51,0.08)] pb-3">
                  <p className="text-secondary font-mono text-[11px] uppercase tracking-[0.28em]">
                    Linked artifacts
                  </p>
                  <p className="text-secondary mt-1 text-sm leading-6">
                    Directly connected nodes in the active path.
                  </p>
                </div>

                <div className="space-y-3">
                  {focusEdges.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => {
                        pushState({
                          lane: entry.node.lane,
                          nodeId: entry.node.id,
                        });
                      }}
                      className="focus-list-item text-left"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p
                            className="font-mono text-[10px] uppercase tracking-[0.24em]"
                            style={{ color: lanes.find((lane) => lane.id === entry.node.lane)?.accent }}
                          >
                            {entry.relation}
                          </p>
                          <p className="font-display mt-2 text-xl leading-none text-[var(--color-graphite)]">
                            {entry.node.title}
                          </p>
                        </div>
                        <span className="text-secondary font-mono text-[10px] uppercase tracking-[0.18em]">
                          open
                        </span>
                      </div>
                      <p className="text-secondary mt-2 text-sm leading-6">{entry.node.summary}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[rgba(31,42,51,0.08)] pt-4">
                <p className="text-secondary font-mono text-[11px] uppercase tracking-[0.28em]">
                  Chronology strip
                </p>
                <div className="timeline-strip mt-4">
                  {timeline.map((entry) => (
                    <div key={entry.year} className="timeline-item">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: activeLane.accent }}>
                        {entry.year}
                      </p>
                      <p className="font-display mt-2 text-lg leading-none text-[var(--color-graphite)]">
                        {entry.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="panel-surface border-hairline-top px-4 py-5 sm:px-6 md:border-t-0 md:border-l md:border-[rgba(31,42,51,0.08)] md:py-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-secondary font-mono text-[11px] uppercase tracking-[0.28em]">
                Data pane
              </p>
              <h2 className="font-display text-3xl leading-none text-[var(--color-graphite)]">
                {activeNode.title}
              </h2>
              <p className="text-secondary text-sm leading-6">{activeNode.summary}</p>
            </div>

            <div className="space-y-3">
              {activeNode.metrics.map((metric) => (
                <div key={metric.label} className="data-pane-row">
                  <p className="text-secondary font-mono text-[11px] uppercase tracking-[0.22em]">
                    {metric.label}
                  </p>
                  <p className="font-display text-2xl leading-none text-[var(--color-graphite)]">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="data-pane-section space-y-3">
              <p className="text-secondary font-mono text-[11px] uppercase tracking-[0.28em]">
                Active lane
              </p>
              <p className="font-display text-xl leading-none text-[var(--color-graphite)]">
                {activeLane.label}
              </p>
              <p className="text-secondary text-sm leading-6">{activeLane.description}</p>
            </div>

            <div className="data-pane-section space-y-3">
              <p className="text-secondary font-mono text-[11px] uppercase tracking-[0.28em]">
                Linked paths
              </p>
              <div className="flex flex-wrap gap-2">
                {relatedNodes.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    className="signal-pill text-left"
                    onClick={() => {
                      pushState({
                        lane: node.lane,
                        nodeId: node.id,
                      });
                    }}
                  >
                    {node.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="data-pane-section">
              <p className="text-secondary font-mono text-[11px] uppercase tracking-[0.24em]">
                URL state
              </p>
              <p className="font-mono mt-3 break-all text-xs leading-6 text-[var(--color-graphite)]">
                {formatHash(state)}
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
