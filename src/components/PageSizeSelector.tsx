export const PageSizeSelector = ({text, value, onChange}: { text: string, value: number, onChange: (event) => void }) => (
    <div className="rounded-xl bg-gray-200 dark:bg-stone-700 flex items-center gap-x-2 px-4">
        <label htmlFor="selectPageSize">{text}</label>
        <select id="selectPageSize" className="bg-gray-200 dark:bg-stone-700" value={value}
                onChange={onChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
        </select>
    </div>
)