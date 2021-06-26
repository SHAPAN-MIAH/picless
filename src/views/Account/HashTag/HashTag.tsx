import React, { useEffect, useState } from "react";
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
        console.log(e);
        e.preventDefault();

        if (tags.length > 5) {
            alert("Please enter 5 input tags")
        }
        else if (tags.length === 0) {
            setErrors((prev) => ({
                ...prev,
                tags: "Please add at least one tag",
            }));
        }
        else if (tags.length > 0) {
            console.log(tags);
            // Submit form
        }


        fetch(`${process.env.REACT_APP_BASE_URL_API}/users/updateprofile`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(tags)
        })
            .then(res => {
                // res.json
                console.log(res.body);
            }
            )
            .then(data => {
                console.log("Successfully added");
            })

    };



    return (
        <div>
            <form onSubmit={submitHandler}>
                <TagsInputs
                    id="tags"
                    name="tags"
                    placeholder="Add tag"
                    changeTags={changeHandler}

                    defaultTags={tags}

                />
                <button className={styles.button} type="submit">Submit</button>
            </form>
        </div>
    );
};

export default HashTag;