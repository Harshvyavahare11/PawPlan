// Location service with permission handling and Pune defaults

export const PUNE_COORDINATES = {
  lat: 18.5362,
  lng: 73.8940,
  name: 'Koregaon Park, Pune'
};

export const locationService = {
  /**
   * Request user location with clear permission status
   */
  async getCurrentPosition() {
    if (!navigator.geolocation) {
      return {
        success: false,
        coords: PUNE_COORDINATES,
        error: 'Geolocation is not supported by your browser.',
        isFallback: true
      };
    }

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            success: true,
            coords: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy
            },
            isFallback: false
          });
        },
        (error) => {
          let errorMsg = 'Location permission denied.';
          if (error.code === error.TIMEOUT) errorMsg = 'Location request timed out.';
          if (error.code === error.POSITION_UNAVAILABLE) errorMsg = 'Location information unavailable.';

          resolve({
            success: false,
            coords: PUNE_COORDINATES,
            error: errorMsg,
            isFallback: true
          });
        },
        { enableHighAccuracy: true, timeout: 6000, maximumAge: 10000 }
      );
    });
  },

  /**
   * Generates a realistic walking route starting from an initial point in Pune
   */
  generateWalkPoints(startLat = 18.5362, startLng = 73.8940, stepCount = 8) {
    const points = [[startLat, startLng]];
    let currentLat = startLat;
    let currentLng = startLng;

    for (let i = 1; i < stepCount; i++) {
      currentLat += (Math.random() - 0.45) * 0.0018;
      currentLng += (Math.random() - 0.45) * 0.0018;
      points.push([Number(currentLat.toFixed(6)), Number(currentLng.toFixed(6))]);
    }

    return points;
  },

  /**
   * Calculate distance between two GPS coordinates in kilometers
   */
  calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(2));
  }
};
