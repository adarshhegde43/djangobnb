import PropertyList from "../components/properties/PropertyList";
import { getUserID } from "../lib/actions"; //becuase we only want aunthenticated users to access my favorites page...

const MyFavoritesPage = async() => {
    const userId = await getUserID();

    if (!userId) { //if user isn't authenticated....
        return (
            <main className="max-w-[2500px] max-auto px-6 py-12 ">
                <p>You need to be authenticated....</p>
            </main>
        )
    }

    return ( //if user is authenticated.... show them the page...
        <main className="max-w-[2500px] max-auto px-6 pb-12 ">
                <h1 className="my-6 text-2xl">
                    My favorites...
                </h1>
                
                <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PropertyList
                        favorites={true}
                    />
                </div>
        </main>
    )
}

export default MyFavoritesPage;