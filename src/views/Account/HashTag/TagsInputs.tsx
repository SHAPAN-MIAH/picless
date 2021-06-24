import React, { useState } from 'react';
import './HashTag.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


interface TagsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

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

        if (e.target.value !== '' && e.target.value !== ',') {


            if (e.key === ',') {

                const newTag = value.trim().split(',')[0];

                if (e.target.value.length > 25) {
                    alert("Tag length should be less than 26")
                }
                else if (!tags.includes(newTag) && newTag !== '') {
                    const arr = [...tags, newTag];
                    setTags(arr);
                    changeTags(name || '', arr);
                }

                setValue('');

            } else if (e.key === 'Enter') {

                const newTag = value.trim();

                if (e.target.value.length > 25) {
                    alert("Tag length should be less than 26")
                }
                else if (!tags.includes(newTag) && newTag !== '') {
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

    const handelBlur = (e: any) => {

        setIsActive(false);
    }


    return (
        <>
            <div className={!isActive ? "tags-input" : "tags-input active"}>

                <div className="tags-input__wrapper" style={{
                    border: '1px solid lightGray',
                    height: '48px',
                    borderRadius: '12px',
                    transition: 'border-color .3s ease',
                }}>
                    <div className="tags-input__tags" style={{ flexWrap: 'wrap', display: 'flex' }}>
                        {tags.map((tag, i) =>
                            <div key={i} className="tag justify-content-center"
                                style={{
                                    display: "inline-block",
                                    backgroundColor: "rgb(226, 226, 226)",
                                    margin: "8.5px 5px",
                                    padding: "0px 7px",
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    fontFamily: "Rajdhani",
                                    textAlign: "center",
                                    marginTop: '7px'
                                }}>
                                {tag} <span className="removeIcon" onClick={() => removeTag(tag)}>
                                    <FontAwesomeIcon icon={faTimesCircle} className="timesIcon" style={{ cursor: "pointer", color: 'gray', marginTop: '8.5px' }} />
                                </span>
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
                            onBlur={handelBlur}
                        />
                    </div>
                </div>
                {error && <div className="error">{error}</div>}
            </div>
        </>
    );
}

export default TagsInputs;