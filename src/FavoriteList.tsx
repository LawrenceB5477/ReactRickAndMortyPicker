import React, { ReactElement, useContext } from "react";
import { RouteComponentProps } from "@reach/router";
import { Store, IEpisode } from "./Store";

export default (props: RouteComponentProps): ReactElement => {
  const { state, dispatch } = useContext(Store);

  const toggleFavAction = (episode: IEpisode): void => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: episode });
  };

  return (
    <>
      <section className="episode-layout">
        {state.favorites.map((episode: IEpisode) => {
          return (
            <section key={episode.id} className="episode-box">
              <img
                src={episode.image.medium}
                alt={`Rick and morty! ${episode.name}`}
              />
              <section className="episode-box__inner">
                <div>
                  <p>{episode.name}</p>
                  <p>
                    Season: {episode.season} Number: {episode.number}
                  </p>
                  <button onClick={() => toggleFavAction(episode)}>
                    {state.favorites.findIndex(e => e.id === episode.id) != -1
                      ? "Unfav"
                      : "Fav"}
                  </button>
                </div>
              </section>
            </section>
          );
        })}
      </section>
    </>
  );
};
