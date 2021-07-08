import React, { useState } from 'react'
import styles from './HashTag.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { useEffect } from 'react'

interface TagsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultTags: string
  //error: string
  onChangeTags: (name: string) => void
}

const TagsInputs = React.forwardRef<HTMLInputElement, TagsInputProps>((props, ref) => {
  const { id, placeholder, defaultTags, onChangeTags, name } = props
  const [value, setValue] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (defaultTags) {
      setTags(defaultTags.split(','))
    }
  }, [defaultTags])

  const removeTag = (tag: string) => {
    const arr = tags.filter((t) => t !== tag)
    setTags(arr)
    onChangeTags(arr.join(','))
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    const key = e.key

    if (key === 'Enter' || key === ',') {
      addTag()
    } else if (e.key === 'Backspace' && tags.length > 0) {
      const copyOfTags = [...tags]

      copyOfTags.pop()

      setTags(copyOfTags)
      onChangeTags(copyOfTags.join(','))
    }
  }

  const addTag = () => {
    if (value.length > 25) {
      alert('Tag length should be less than 26')
    } else {
      let tag = value.trim()
      tag = tag.replace(/,/g, '')

      const isDuplicated = tags.includes(tag) && tag !== ''

      if (!tag || isDuplicated) {
        return
      }

      const updatedTagList = tags.concat(tag)

      setTags(updatedTagList)
      onChangeTags(updatedTagList.join(','))

      setValue('')
    }
  }

  return (
    <>
      <div className={classNames('tags-input ', isActive ? 'active' : '')}>
        <div className={styles.inputWrapper}>
          <div className={styles.tags_input}>
            {tags.map((tag, i) => (
              <div key={i} className={styles.tag}>
                {tag}{' '}
                <span onClick={() => removeTag(tag)}>
                  <FontAwesomeIcon icon={faTimesCircle} className={styles.timesIcon} />
                </span>
              </div>
            ))}
            <input
              type="text"
              ref={ref}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
              onKeyUp={onKeyUp}
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
              onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </>
  )
})

export default TagsInputs
