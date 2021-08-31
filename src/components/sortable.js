import React from 'react';
import SortableJS from 'sortablejs';

export default class Sortable extends React.Component {  
  
  componentDidMount() {
    const { disabled, handle, ghostClass } = this.props;
    const isTouchBrowser = ('ontouchstart' in window);
    
    new SortableJS(this.sortableEl, {
      delay: isTouchBrowser ? 100 : 0,
      delayOnTouchStart: isTouchBrowser,
      disabled,
      ghostClass,
      handle,
      onSort: this.onSort.bind(this)
    });
  }

  onSort(event) {
    const { value, onChange } = this.props;
    const fromIndex = event.oldIndex;
    const toIndex = event.newIndex;
    const list = [...value];
    const item = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, item[0]);
    onChange(list);
  }

  render() {
    const { className, tag, children } = this.props;  

    return (
      React.createElement(tag, { className, ref: elem => this.sortableEl = elem }, children)
    );
  }

}