import React from 'react';

export default function PostEditionBar(props) {
  const { isLoading, translations, data, onEdit, onDelete } = props;

  return (
    <>
      <div className="post-edition-bar">
        <button
          type="button"
          disabled={isLoading}
          title={translations['edit']}
          onClick={() => onEdit(data)}>
          <i className="fas fa-pen" />
        </button>
        {
          onDelete &&
          <button
            type="button"
            disabled={isLoading}
            title={translations['delete']}
            onClick={() => onDelete(data)}>
            <i className="fas fa-trash" />
          </button>
        }
        <style jsx>{`
          .post-edition-bar {
            background: rgba(0, 0, 0, 0.4);
            border: 0;
            padding: 0;
            margin: 0;
            text-align: right;

            button {
              background: none;
              border: none;
              cursor: pointer;
              color: white;
              padding: var(--spacer);
            }
          }
        `}</style>
      </div>
    </>
  );
}