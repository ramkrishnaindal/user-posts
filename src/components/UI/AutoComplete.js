import React, { useState } from "react";
import ReactTags from "react-tag-autocomplete";
import "./AutoComplete.css";
import classes from "./AutoComplete.module.css";

const AutoComplete = (props) => {
  const reactTags = React.createRef();
  const [tagsState, setTagsState] = useState({
    tags: props.tags || [
      { id: 1, name: "Apples" },
      { id: 2, name: "Pears" },
    ],
    suggestions: props.suggestions || [
      { id: 3, name: "Bananas" },
      { id: 4, name: "Mangos" },
      { id: 5, name: "Lemons" },
      { id: 6, name: "Apricots" },
    ],
  });
  const onDelete = (i) => {
    const tags = tagsState.tags.slice(0);
    tags.splice(i, 1);
    setTagsState((prevState) => {
      return {
        ...prevState,
        tags: [...tags],
      };
    });
    props.onTagsChanged(tags);
  };
  const onAddition = (tag) => {
    
    const tags = [].concat(tagsState.tags, tag);
    setTagsState((prevState) => {
      return {
        ...prevState,
        tags: [...tags],
      };
    });
    props.onTagsChanged(tags);
  };
  return (
    <div className={classes.container}>
      <div className={classes.labelContainer}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <label>{props.title}</label>
        </div>
      </div>
      <ReactTags
        placeholderText={props.placeholderText || "Enter a value"}
        ref={reactTags}
        minQueryLength={1}
        tags={tagsState.tags}
        suggestions={tagsState.suggestions}
        onDelete={onDelete}
        allowNew
        onAddition={onAddition}
        className={classes.reactTags}
      />
    </div>
  );
};

export default AutoComplete;

// export default class AutoComplete extends React.Component {
//     constructor (props) {
//       super(props)

//       this.state = {
//         tags: [
//           { id: 1, name: "Apples" },
//           { id: 2, name: "Pears" }
//         ],
//         suggestions: [
//           { id: 3, name: "Bananas" },
//           { id: 4, name: "Mangos" },
//           { id: 5, name: "Lemons" },
//           { id: 6, name: "Apricots" }
//         ]
//       }

//       this.reactTags = React.createRef()
//     }

//     onDelete (i) {
//       const tags = this.state.tags.slice(0)
//       tags.splice(i, 1)
//       this.setState({ tags })
//     }

//     onAddition (tag) {
//       const tags = [].concat(this.state.tags, tag)
//       this.setState({ tags })
//     }

//     render () {
//       return (
//         <ReactTags
//           ref={this.reactTags}
//           tags={this.state.tags}
//           suggestions={this.state.suggestions}
//           onDelete={this.onDelete.bind(this)}
//           onAddition={this.onAddition.bind(this)} />
//       )
//     }
//   }
// const AutoComplete = (props) => {
//   const [tags, setTags] = useState(props.tags || []);
//   const [suggestions] = useState(props.suggestions);
//   const autoCompleteRef = useRef();
//   const handleDelete = (i) => {
//     const tagsArr = tags.slice(0);
//     tagsArr.splice(i, 1);
//     setTags(tagsArr);
//     props.tagChanged(tags);
//   };
//   const handleAddition = (tag) => {
//     const tagsArr = [].concat(tags, tag);
//     setTags(tagsArr);
//     props.tagChanged(tagsArr);
//   };
//   return (
//     <div>
//       <ReactTags
//         tags={tags}
//         ref={autoCompleteRef}
//         suggestions={suggestions}
//         handleDelete={handleDelete}
//         handleAddition={handleAddition}
//         allowNew
//         placeholder={props.placeholder || "Enter a letter to get suggestion"}
//         minQueryLength={1}
//       />
//     </div>
//   );
// };

// export default AutoComplete;
