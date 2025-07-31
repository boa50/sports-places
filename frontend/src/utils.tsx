export async function checkLocationPermission(): Promise<PermissionState> {
    // Check if geolocation is supported at all
    if (!navigator.geolocation) {
        return 'prompt'
    }

    // Try modern Permissions API first
    if (navigator.permissions?.query) {
        try {
            const permissionStatus = await navigator.permissions.query({
                name: 'geolocation' as any, // TypeScript workaround
            })
            return permissionStatus.state as PermissionState
        } catch (error) {
            console.warn('Permissions API query failed, falling back', error)
        }
    }

    // Fallback for older browsers
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            () => resolve('granted'),
            (error) => {
                resolve(
                    error.code === error.PERMISSION_DENIED ? 'denied' : 'prompt'
                )
            },
            { maximumAge: Infinity, timeout: 0 }
        )
    })
}
