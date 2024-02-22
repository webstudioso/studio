// Handle tailwind's use of slashes in css names
export const escapeName = (name) => `${name}`.trim().replace(/([^a-z0-9\w-:/]+)/gi, "-")