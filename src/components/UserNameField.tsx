"use client";

import React, {useState} from "react";

export const UserNameField = ({userName, saveFunc}: { userName: string, saveFunc: (newName: string) => Promise<void>}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(userName);
    return (
        <div className="flex items-center mb-8">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedName}
                        onChange={event => setEditedName(event.target.value)}
                        className="mr-2 p-2 border rounded dark:bg-neutral-600"
                    />
                    <button
                        onClick={() => {
                            saveFunc(editedName)
                            setIsEditing(false)
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold">{editedName}</h1>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                    >
                        Edit
                    </button>
                </>
            )}
        </div>
    )
}