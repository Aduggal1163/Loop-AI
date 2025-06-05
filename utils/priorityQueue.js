export function sortQueue(queue) {
  const priorityMap = { HIGH: 1, MEDIUM: 2, LOW: 3 };
  return queue.sort((a, b) => {
    const pDiff = priorityMap[a.priority] - priorityMap[b.priority];
    if (pDiff !== 0) return pDiff;
    return a.createdAt - b.createdAt;
  });
}
