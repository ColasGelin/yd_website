(function () {
  let data = null;
  let state = null;
  let started = false;

  async function load() {
    if (data) return data;
    const res = await fetch("data/questions.json");
    if (!res.ok) throw new Error("fetch failed");
    data = await res.json();
    return data;
  }

  function lang() { return (window.I18n && window.I18n.get()) || "fr"; }
  function tr(key) { return (window.I18n && window.I18n.t(key)) || key; }

  function loc(obj, field) {
    if (!obj) return "";
    const l = lang();
    if (l !== "fr") {
      const alt = obj[field + "_" + l];
      if (alt) return alt;
    }
    return obj[field] || "";
  }

  function isLeaf(node) {
    return !!(node && (node.outcome || node.outcome_en));
  }

  // Longest question-node path from `id` to any leaf/null.
  function depthFrom(tree, id, memo) {
    if (id == null) return 0;
    if (memo[id] != null) return memo[id];
    const n = tree.nodes[id];
    if (!n || isLeaf(n)) { memo[id] = 0; return 0; }
    const y = depthFrom(tree, n.yes, memo);
    const no = depthFrom(tree, n.no, memo);
    memo[id] = 1 + Math.max(y, no);
    return memo[id];
  }

  function treeMaxSteps(tree) {
    return depthFrom(tree, tree.root, {});
  }

  function reset() {
    state = { treeIndex: 0, nodeId: null, treeStep: 1, results: [] };
    const tree = data.trees[0];
    state.nodeId = tree ? tree.root : null;
  }

  function updateProgress() {
    const total = data.trees.length;
    const done = state.results.length;
    document.getElementById("q-progress-count").textContent = done + " / " + total;
    document.getElementById("q-progress-fill").style.width =
      (done / total) * 100 + "%";

    const tree = data.trees[state.treeIndex];
    const label = document.getElementById("q-tree-label");
    if (tree) {
      label.textContent =
        tr("q.theme") + " " + (state.treeIndex + 1) + " — " + loc(tree, "label");
    } else {
      label.textContent = tr("q.done");
    }
  }

  function renderSteps() {
    const container = document.getElementById("q-steps");
    container.innerHTML = "";
    const tree = data.trees[state.treeIndex];
    if (!tree) { container.hidden = true; return; }
    container.hidden = false;
    const total = Math.max(1, treeMaxSteps(tree));
    for (let i = 1; i <= total; i++) {
      const seg = document.createElement("div");
      seg.className = "step";
      if (i < state.treeStep) seg.classList.add("done");
      else if (i === state.treeStep) seg.classList.add("current");
      container.appendChild(seg);
    }
  }

  function renderCurrent() {
    const running = document.getElementById("q-running");
    const summary = document.getElementById("q-summary");
    const questionEl = document.getElementById("q-question");

    if (state.treeIndex >= data.trees.length) {
      running.hidden = true;
      summary.hidden = false;
      renderSummary();
      return;
    }

    const tree = data.trees[state.treeIndex];
    const node = tree.nodes[state.nodeId];
    questionEl.textContent = loc(node, "question");
    running.hidden = false;
    summary.hidden = true;
    updateProgress();
    renderSteps();
  }

  function enterNextTree() {
    state.treeIndex += 1;
    state.treeStep = 1;
    const next = data.trees[state.treeIndex];
    state.nodeId = next ? next.root : null;
  }

  function recordAndAdvance(outcomeNode, fallbackKey, skipped) {
    const tree = data.trees[state.treeIndex];
    state.results.push({
      treeRef: tree,
      outcomeNode: outcomeNode,
      fallbackKey: fallbackKey,
      skipped: !!skipped,
    });
    enterNextTree();
  }

  function answer(choice) {
    if (!state || state.treeIndex >= data.trees.length) return;
    const tree = data.trees[state.treeIndex];
    const node = tree.nodes[state.nodeId];
    if (!node) return;

    if (choice === "no") {
      recordAndAdvance(null, "q.skipped", true);
      renderCurrent();
      return;
    }

    const nextId = node.yes;
    if (nextId == null) {
      recordAndAdvance(null, "q.noted", false);
      renderCurrent();
      return;
    }
    const nextNode = tree.nodes[nextId];
    if (isLeaf(nextNode)) {
      recordAndAdvance(nextNode, null, false);
      renderCurrent();
      return;
    }
    state.nodeId = nextId;
    state.treeStep += 1;
    renderCurrent();
  }

  function renderSummary() {
    const list = document.getElementById("q-summary-list");
    list.innerHTML = "";
    state.results.forEach((r) => {
      const li = document.createElement("li");
      if (r.skipped) li.classList.add("skipped");
      const strong = document.createElement("strong");
      strong.textContent = loc(r.treeRef, "label");
      const text = document.createElement("span");
      text.textContent = r.outcomeNode
        ? loc(r.outcomeNode, "outcome")
        : tr(r.fallbackKey);
      li.appendChild(strong);
      li.appendChild(text);
      list.appendChild(li);
    });
  }

  async function ensureStarted() {
    try {
      await load();
    } catch (e) {
      document.getElementById("q-question").textContent =
        tr("q.error").replace("%s", e.message);
      return;
    }
    if (!started) {
      reset();
      started = true;
    }
    renderCurrent();
  }

  function restart() {
    reset();
    renderCurrent();
  }

  function refresh() {
    if (!started) return;
    renderCurrent();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const yes = document.getElementById("q-yes");
    const no = document.getElementById("q-no");
    const restartBtn = document.getElementById("q-restart");
    if (yes) yes.addEventListener("click", () => answer("yes"));
    if (no) no.addEventListener("click", () => answer("no"));
    if (restartBtn) restartBtn.addEventListener("click", restart);

    if (window.I18n) window.I18n.onChange(refresh);
  });

  window.Questionnaire = { ensureStarted, restart };
})();
