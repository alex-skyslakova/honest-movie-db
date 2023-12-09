export const PagesNavigationButtons = ({page, pageSize, itemCount, prevFunc, nextFunc}: { page: number, pageSize: number, itemCount: number, prevFunc: () => void, nextFunc: () => void }) => (
    <div className="flex gap-x-2">
        <button disabled={page == 1}
                onClick={prevFunc}
                className={`${page == 1 ? "text-gray-500 bg-gray-300 dark:bg-stone-900" : "bg-gray-200 dark:bg-stone-700"} rounded-full px-5 text-xl`}>&#10094;</button>
        <button disabled={page * pageSize >= itemCount}
                onClick={nextFunc}
                className={`${page * pageSize >= itemCount ? "text-gray-500 bg-gray-300 dark:bg-stone-900" : "bg-gray-200 dark:bg-stone-700"} rounded-full px-5 text-xl`}>&#10095;</button>
    </div>
)