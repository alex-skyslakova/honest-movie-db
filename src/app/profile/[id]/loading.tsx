export default function Loading() {
    return (
        <div className="flex items-start justify-center min-h-screen">
            <div className="mx-auto my-8 mx-8 p-8 dark:bg-neutral-800 shadow-md rounded-md overflow-y-auto align-middle">
                {/* Loader message or animation */}
                <p>Loading profile...</p>
            </div>
        </div>
    );
}