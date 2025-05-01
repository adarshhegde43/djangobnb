import Image from "next/image";

interface CategoriesProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({
    selectedCategory,
    onCategoryChange
}) => {
    return (
        <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
            <div 
                onClick={() => onCategoryChange('')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                selectedCategory === '' ? 'border-gray-800' : 'border-white'
                } opacity-70 hover:border-gray-200 hover:opacity-100`}
            >
                <Image
                src="/icn_category.jpg"
                alt="Category - All"
                width={20}
                height={20}
                />
                <span className="text-xs">All</span>
            </div>

            <div 
                onClick={() => onCategoryChange('beach')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                selectedCategory === 'beach' ? 'border-gray-800' : 'border-white'
                } opacity-70 hover:border-gray-200 hover:opacity-100`}
            >
                <Image
                src="/icn_category.jpg"
                alt="Category - Beach"
                width={20}
                height={20}
                />
                <span className="text-xs">Beach</span>
            </div>

            <div 
                onClick={() => onCategoryChange('villas')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                selectedCategory === 'villas' ? 'border-gray-800' : 'border-white'
                } opacity-70 hover:border-gray-200 hover:opacity-100`}
            >
                <Image
                src="/icn_category.jpg"
                alt="Category - Villas"
                width={20}
                height={20}
                />
                <span className="text-xs">Villas</span>
            </div>

            <div 
                onClick={() => onCategoryChange('cabins')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                selectedCategory === 'cabins' ? 'border-gray-800' : 'border-white'
                } opacity-70 hover:border-gray-200 hover:opacity-100`}
            >
                <Image
                src="/icn_category.jpg"
                alt="Category - Cabins"
                width={20}
                height={20}
                />
                <span className="text-xs">Cabins</span>
            </div>

            <div 
                onClick={() => onCategoryChange('tiny_homes')}
                className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                selectedCategory === 'tiny_homes' ? 'border-gray-800' : 'border-white'
                } opacity-70 hover:border-gray-200 hover:opacity-100`}
            >
                <Image
                src="/icn_category.jpg"
                alt="Category - Tiny Homes"
                width={20}
                height={20}
                />
                <span className="text-xs">Tiny Homes</span>
            </div>
        </div>
    );
};

export default Categories;