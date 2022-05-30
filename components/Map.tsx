import { useRef, useEffect } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const API_KEY = process.env.NEXT_PUBLIC_GMAPS_API_KEY;
if (API_KEY === undefined) throw new Error("Google Maps API key required.");

interface MapProps {
  geojson: any;
}

const Map = ({ geojson }: MapProps) => {
  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return (
          // SPINNER
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="h-6 w-6 animate-spin"
            >
              <path d="M222.7 32.15C227.7 49.08 218.1 66.9 201.1 71.94C121.8 95.55 64 169.1 64 255.1C64 362 149.1 447.1 256 447.1C362 447.1 448 362 448 255.1C448 169.1 390.2 95.55 310.9 71.94C293.9 66.9 284.3 49.08 289.3 32.15C294.4 15.21 312.2 5.562 329.1 10.6C434.9 42.07 512 139.1 512 255.1C512 397.4 397.4 511.1 256 511.1C114.6 511.1 0 397.4 0 255.1C0 139.1 77.15 42.07 182.9 10.6C199.8 5.562 217.6 15.21 222.7 32.15V32.15z" />
            </svg>
          </div>
        );
      case Status.FAILURE:
        // ERROR MESSAGE
        return (
          <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p>Error: Failed to load map</p>
          </div>
        );
      case Status.SUCCESS:
        const center = new window.google.maps.LatLng(4, 109.5);
        return <GoogleMap center={center} zoom={5} geojson={geojson} />;
    }
  };

  return <Wrapper apiKey={API_KEY} render={render} />;
};

interface GoogleMapProps extends google.maps.MapOptions {
  geojson: any;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ center, zoom, geojson }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const map = new google.maps.Map(ref.current, {
        center: center,
        zoom: zoom,
      });

      // LOAD GEOJSON
      map.data.addGeoJson(geojson);

      // SET GEOJSON STYLE
      map.data.setStyle({
        fillColor: "#ffffff",
        fillOpacity: 0.25,
        strokeColor: "#13293d",
        strokeWeight: 1,
      });

      // FIT MAP TO GEOJSON BOUNDS
      let bounds = new google.maps.LatLngBounds();
      map.data.forEach(feature => {
        feature.getGeometry()?.forEachLatLng(latLng => {
          bounds?.extend(latLng);
        });
      });

      map.fitBounds(bounds);
    }
  }, [geojson]);

  // GOOGLE MAP CONTAINER
  return <div className="h-64 w-full rounded-lg lg:h-full" ref={ref} />;
};

export default Map;
