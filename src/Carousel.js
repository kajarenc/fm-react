import React, { Component } from "react";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      active: 0,
      acc: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos };
  }

  handleClick(event) {
    this.setState({
      active: parseInt(event.target.dataset.index, 10),
    });
  }

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal"></img>
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            <img
              key={photo}
              onClick={this.handleClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            ></img>
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
