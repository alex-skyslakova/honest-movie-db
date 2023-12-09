
type SideBarItemProps = {
    title: string;
    children: React.ReactNode;
}

const SideBarItem = ({ title, children }: SideBarItemProps) => (
    <div className="sidebar-item flex flex-col items-center p-4 mb-4">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
    </div>
);

export default SideBarItem;
