import React, { Component } from "react";

import { Photo } from "@frontendmasters/pet";

interface ICarouselProps {
  media: Photo[];
}

interface ICarouselState {
  active: number;
  photos: string[];
}

class Carousel extends Component<ICarouselProps, ICarouselState> {
  public state: ICarouselState = {
    photos: [],
    active: 0,
  };

  public static getDerivedStateFromProps({
    media,
  }: ICarouselProps): { photos: string[] } {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    return { photos };
  }

  public handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    if (event.target.dataset.index) {
      this.setState({
        active: parseInt(event.target.dataset.index, 10),
      });
    }
  };

  public render() {
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
