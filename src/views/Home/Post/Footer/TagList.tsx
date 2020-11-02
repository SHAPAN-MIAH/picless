import React, { FunctionComponent } from 'react'

const TagList: FunctionComponent<{ tags: string[] }> = (prop) => {
  const { tags } = prop

  // TODO: Change in the service that tags need be in string array
  const tagList: string[] = tags.toString().split(',')

  return (
    <>
      <div className="tag-list">
        {tagList.map((tag) => {
          return (
            <span key={tag} className="tag-item secondary">
              {tag}
            </span>
          )
        })}
      </div>
    </>
  )
}

export default TagList
