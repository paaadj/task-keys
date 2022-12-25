import React, { useState } from 'react';
import { IItem } from './index';

export function Item(props: { id: number; name: string }) {
    const [name, setName] = useState(props.name);
    const [editedName, setEditedname] = useState(props.name);
    const [inEdit, setInEdit] = useState(false);

    const editKeyHandler = (el: React.KeyboardEvent<HTMLInputElement>) => {
        if (el.key == 'Enter') {
            setName(editedName);
            setInEdit(false);
        } else if (el.key == 'Escape') {
            setInEdit(false);
        }
    };

    if (inEdit) {
        return (
            <input
                type="text"
                defaultValue={name}
                onKeyDown={editKeyHandler}
                onChange={(el) => setEditedname(el.target.value)}
            />
        );
    } else {
        return <div onClick={() => setInEdit(true)}>{name}</div>;
    }
}

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [name, setName] = useState('');

    if (props.sorting === 'ASC') {
        props.initialData.sort((a, b) => a.id - b.id);
    } else {
        props.initialData.sort((a, b) => b.id - a.id);
    }

    return (
        <div>
            {props.initialData.map((el) => (
                <Item key={el.id} id={el.id} name={el.name} />
            ))}
        </div>
    );
}
