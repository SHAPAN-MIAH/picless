import React from 'react';
import ReactDOM from 'react-router-dom';
import './HashTags.scss';

// type tagsValue = {
// 	index: number,
// 	event: string,
// 	value: string
// }
// let index:number;
let value: string;
let tags : string[] = [];
let indexToRemove: number;

const Hashtags: React.FunctionComponent<{}> = () => {
	const [tags, setTags] = React.useState([]);
	const removeTags =(indexToRemove: number) => {
		// setTags([tags.filter((index:number) => index !== indexToRemove)]);
	};
	const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
			// if (event.target.value !== "") {
				// setTags([...tags, event.target.value]);
				// event.target.value = "";
			// }
			// console.log(event)
		// };
	};
		return (
		<div className="HashTags">
			<div className="tags-input">
				<ul id="tags">
					{tags.map((tag: string, index:number) => (
						<li key={index} className="tag">
							<span className='tag-title'>{tag}</span>
							<span className='tag-close-icon'
								onClick={() => removeTags(index)}
							>
								x
							</span>
						</li>
					))}
				</ul>
				<input
					type="text"
					onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
					placeholder="Press enter to add tags"
				/>
			</div>
		</div>
	);
};

export default Hashtags;