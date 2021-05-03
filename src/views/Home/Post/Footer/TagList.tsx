import React, { FunctionComponent } from 'react'
import { TagType } from '../../../../types/PostType.d'

const TagList: FunctionComponent<{ tags: TagType[] }> = (prop) => {
  const { tags } = prop

  const tagList: TagType[] = tags

  return (
    <>
      <div className="tag-list">
        {tagList.map((tag) => {
          return (
            <span key={`tag-${tag.id}`} className="tag-item secondary">
              {tag.tagName}
            </span>
          )
        })}
      </div>
    </>
  )
}

export default TagList
