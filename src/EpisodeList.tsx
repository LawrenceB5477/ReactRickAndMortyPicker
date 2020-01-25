import React, { ReactElement, useContext } from "react";
import { Store, IEpisode } from "./Store";
import { RouteComponentProps } from "@reach/router";

export default (props: RouteComponentProps): ReactElement => {
  const { state, dispatch } = useContext(Store);

  const fetchDataAction = async () => {
    const data = await fetch(
      "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes"
    );
    const json = await data.json();
    console.log(json);
    dispatch({ type: "FETCH_DATA", payload: json._embedded.episodes });
  };

  React.useEffect(() => {
    if (state.episodes.length === 0) {
      fetchDataAction();
    }
  });

  const toggleFavAction = (episode: IEpisode): void => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: episode });
  };

  return (
    <>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => {
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
