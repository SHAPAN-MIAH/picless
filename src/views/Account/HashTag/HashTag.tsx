import React, { useState } from "react";
import TagsInputs from "./TagsInputs";
import styles from './HashTag.module.css'

const HashTag: React.FunctionComponent<{}> = () => {
    interface errorType {
        tags?: string;
    }
    const [tags, setTags] = useState<string[]>([]);
    const [errors, setErrors] = useState<errorType>({});

    const changeHandler = (name: string, value: string[] = []) => {
        if (name === "tags") {
            setTags(value);
            if (value.length > 0 && errors.tags) {
                setErrors((prev) => {
                    const prevErrors = { ...prev };
                    delete prevErrors.tags;
                    return prevErrors;
                });
            }
        }
    };

    const submitHandler = (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();

        if (tags.length === 0) {
            setErrors((prev) => ({
                ...prev,
                tags: "Please add at least one tag",
            }));
        }
        if (tags.length > 0) {
            console.log(tags);
            // Submit form
        }
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <TagsInputs
                    // label="Tags"
                    id="tags"
                    name="tags"
                    placeholder="Add tag"
                    changeTags={changeHandler}
                    error={errors.tags || ''}
                    defaultTags={tags}
                />
                {/* <button type="submit">Submit</button> */}
            </form>
        </div>
    );
};

export default HashTag;