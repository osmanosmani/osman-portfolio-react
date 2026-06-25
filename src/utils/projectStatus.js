const completedStatuses = new Set(['Completed', 'Live Demo', 'Live', 'Portfolio Ready'])

export function getProjectStatusClass(status) {
  if (status === 'Professional Work') {
    return 'professional'
  }

  if (completedStatuses.has(status)) {
    return 'completed'
  }

  return 'in-progress'
}
