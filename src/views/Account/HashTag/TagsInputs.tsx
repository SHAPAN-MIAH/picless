import React, { useState } from 'react';
import './HashTag.module.css'

interface TagsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // label: string;
    defaultTags: string[];
    error: string
    changeTags: (name: string, list: string[]) => void
}
const TagsInputs: React.FunctionComponent<TagsInputProps> = (props) => {
    const { id, placeholder, error, defaultTags, changeTags, name } = props

    const [value, setValue] = useState('');
    const [tags, setTags] = useState(defaultTags ? defaultTags : []);
    const [isActive, setIsActive] = useState(false);

    const changeHandler = (e: any) => {
        setValue(e.target.value);
        const arr = tags.filter(t => t !== '');

        if (changeTags)
            changeTags(name || '', arr);
    }

    const removeTag = (tag: string) => {
        const arr = tags.filter(t => t !== tag);
        setTags(arr);
        changeTags(name || '', arr);
    }

    const updateTagsHandler = (e: any) => {
        e.preventDefault();

        // Add tags if input is not empty and if input value is not comma
        if (e.target.value !== '' && e.target.value !== ',') {

            if (e.key === ',') {

                const newTag = value.trim().split(',')[0];

                if (!tags.includes(newTag) && newTag !== '') {
                    const arr = [...tags, newTag];
                    setTags(arr);
                    changeTags(name || '', arr);
                }

                setValue('');

            } else if (e.key === 'Enter') {

                const newTag = value.trim();

                if (!tags.includes(newTag) && newTag !== '') {
                    const arr = [...tags, newTag];
                    setTags(arr);
                    changeTags(name || '', arr);
                }

                setValue('');

            }

        }

        // Remove tags if backspace is pressed
        if (e.key === 'Backspace' && tags.length > 0) {
            const copyOfTags = [...tags];
            copyOfTags.pop();
            setTags(copyOfTags);
            changeTags(name || '', copyOfTags);
        }
    }

    const focusHandler = () => {
        setIsActive(true);
    }

    const blurHandler = () => {
        setIsActive(false);
    }

    return (<>

        <div className={!isActive ? "tags-input" : "tags-input active"}>
            {/* {label && <label htmlFor={id ? id : name}>{label}</label>} */}
            <div className="tags-input__wrapper">
                <div className="tags-input__tags">
                    {tags.map((tag, i) =>
                        <div key={i} className="tag">
                            {tag} <span onClick={() => removeTag(tag)}><i className="fas fa-times-circle"></i></span>
                        </div>
                    )}
                    <input
                        type="text"
                        placeholder={placeholder}
                        name={name}
                        id={id ? id : name}
                        value={value}
                        onChange={changeHandler}
                        autoComplete="off"
                        onKeyUp={updateTagsHandler}
                        onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                        onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                    />
                </div>
            </div>
            {error && <div className="error">{error}</div>}
        </div>    </>

    );
}

export default TagsInputs;