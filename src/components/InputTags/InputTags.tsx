/* eslint-disable no-script-url */
import React, { FunctionComponent, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './InputTags.module.css'

const ENTER_KEY = 13
const COMMA_KEY = 188
const BACKSPACE_KEY = 8

interface InputTagsProps {
  onChange: any
}

const InputTags: FunctionComponent<InputTagsProps> = (props) => {
  const { onChange } = props
  const [tags, setTags] = useState<string[]>([])
  const [value, setValue] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.keyCode

    if (key === ENTER_KEY || key === COMMA_KEY) {
      addTag()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.keyCode
    if (key === BACKSPACE_KEY && !value) {
      editPrevTag()
    }
  }

  const addTag = () => {
    let tag = value.trim()

    tag = tag.replace(/,/g, '')

    const isDuplicated = tags.some((item) => item === tag)
    if (!tag || isDuplicated) {
      return
    }

    setTags(tags.concat(tag))
    setValue('')

    onChange(JSON.stringify(tags.concat(tag)))
  }

  const editPrevTag = () => {
    const tag = tags.pop()

    setValue(tag || '')
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <>
      <div className={styles.tags}>
        <ul>
          {tags.map((tag, index) => (
            <li key={tag + index.toString()} className={styles.tag}>
              {tag}{' '}
              <a
                href="#!"
                title="Remove tag"
                className={styles.removeTag}
                onClick={() => {
                  removeTag(tag)
                }}
              >
                <FontAwesomeIcon icon="times" />
              </a>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add tag..."
          value={value}
          onChange={handleChange}
          // ref="tag"
          className={styles.tagInput}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
      </div>
      <small>
        Press <code>enter</code> or <code>,</code> to add a tag. Press <code>backspace</code> to edit previous tag.
      </small>
    </>
  )
}

export default InputTags
