import React, { useState } from 'react';
import styles from './HashTag.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';


interface TagsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {

    defaultTags: string;
    //error: string
    onChangeTags: (name: string) => void
}

const TagsInputs: React.FunctionComponent<TagsInputProps> = (props) => {
    const { id, placeholder, defaultTags, onChangeTags, name } = props
    const [value, setValue] = useState('');
    const [tags, setTags] = useState<string[]>(defaultTags ? defaultTags.split(',') : []);
    const [isActive, setIsActive] = useState(false);

    const tagChanges = () => {
        const currentTags: string = tags.join(',')

        onChangeTags(currentTags)
    }

    const removeTag = (tag: string) => {
        const arr = tags.filter(t => t !== tag);
        setTags(arr);
        tagChanges()
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
                    tagChanges()
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
                    tagChanges()
                }
                setValue('');
            }
        }

        // Remove tags if backspace is pressed
        if (e.key === 'Backspace' && tags.length > 0) {
            const copyOfTags = [...tags];
            copyOfTags.pop();
            setTags(copyOfTags);
            tagChanges()
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

                <div className={styles.inputWrapper}>
                    <div className={styles.tags_input}>
                        {tags.map((tag, i) =>
                            <div key={i} className={styles.tag}>
                                {tag} <span onClick={() => removeTag(tag)}>
                                    <FontAwesomeIcon icon={faTimesCircle} className={styles.timesIcon} />
                                </span>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder={placeholder}
                            name={name}
                            id={id ? id : name}
                            value={value}
                            onChange={(e: any) => setValue(e.target.value)}
                            autoComplete="off"
                            onKeyUp={updateTagsHandler}
                            onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                            onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
                            onFocus={focusHandler}
                            onBlur={handelBlur}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default TagsInputs;