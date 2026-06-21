import React from 'react'

const Card = (props) => {
  return (
    <a
      href={props.elem.url}
      target="_blank"
      rel="noreferrer"
      className="group"
    >
      <div className="w-56 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-amber-400 transition-all duration-300 hover:-translate-y-1">

        {/* Image */}
        <div className="h-40 overflow-hidden">
          <img
            src={props.elem.download_url}
            alt={props.elem.author}
            className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
          />
        </div>

        {/* Author Name */}
        <div className="p-3">
          <h2 className="font-semibold text-sm text-center truncate">
            {props.elem.author}
          </h2>
        </div>

      </div>
    </a>
  )
}

export default Card