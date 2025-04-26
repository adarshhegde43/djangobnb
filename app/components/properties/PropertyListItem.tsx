import Image from "next/image";
import { PropertyType } from "./PropertyList";

interface PropertyProps {
    property : PropertyType
}

const PropertyListItem: React.FC<PropertyProps> = ({
    property
}) => {
    return (
    <div className="cursor-pointer">
        <div className="relative overflow-hidden aspect-square rounded-xl w-full h-[200px]">
        <Image
            fill
            src={property.image_url}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="hover:scale-110 object-cover transition"
            alt="Beach House"
        />
        </div>

        <div className="mt-2">
            <p className="text-lg font-bold">{property.title}</p>
        </div>

        <div className="mt-2">
            <p className="text-sm text-gray-700 font-bold"><strong>${property.price_per_night} per night</strong></p>
        </div>
    </div>
    );
};

export default PropertyListItem;