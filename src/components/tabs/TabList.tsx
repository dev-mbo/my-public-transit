import React from "react";

type TabType = "list" | "import" | "export"
type TabListProps = {
    tab: TabType,
    onClickHandler: (tab: TabType) => void
}

export default function TabList({ tab, onClickHandler }: TabListProps): React.ReactNode {

    return (                 
        <div className="tabs is-boxed">
            <ul>
                <li className={tab === "list" ? "is-active" : ""}>
                    <a onClick={() => onClickHandler("list")}>Verbindungen</a>
                </li>
                <li className={tab === "import" ? "is-active" : ""}>
                    <a onClick={() => onClickHandler("import")}>Import</a>
                </li>
                <li className={tab === "export" ? "is-active" : ""}>
                    <a onClick={() => onClickHandler("export")}>Export</a>
                </li>
            </ul>
        </div>
    )
}