import React, { Component } from "react";
import "tachyons";
import "./Stories.css";
import Footer from "./Footer";
var storiesArr = [];
var mutableStoriesArr = [];
var startIndex = 0;
var runningIndex = 0;
var lastIndex = 0;
var limit = 10;
class Jobs extends Component {
  // constructor()
  state = {
    stories: [],
  };
  componentDidMount() {
    fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
      .then((res) => res.json())
      .then((data) => {
        lastIndex = data.length;
        data = data.slice(startIndex, (runningIndex = startIndex + 30));
        var dataLen = data.length;
        data.forEach((data) => {
          console.log(dataLen);
          fetch(`https://hacker-news.firebaseio.com/v0/item/${data}.json`)
            .then((res) => res.json())
            .then((story) => {
              story = JSON.stringify(story);
              storiesArr.push(story);
              if (mutableStoriesArr.length >= dataLen) {
                console.log("inside if");
                mutableStoriesArr = [];
              }
              mutableStoriesArr.push(story);
              this.setState({ stories: storiesArr });
              console.log(mutableStoriesArr);
              // this.setState({stories: (this.storiesArr)})
            });
        });
      })
      .catch(console.log);
  }

  getNextPage(first, last) {
    runningIndex = first + 30;
    // i = runningIndex;
    fetch("https://hacker-news.firebaseio.com/v0/jobstories.json")
      .then((res) => res.json())
      .then((data) => {
        lastIndex = data.length;
        data = data.slice(first, last);
        var dataLen = data.length;
        data.forEach((data) => {
          fetch(`https://hacker-news.firebaseio.com/v0/item/${data}.json`)
            .then((res) => res.json())
            .then((story) => {
              story = JSON.stringify(story);
              storiesArr.push(story);
              if (mutableStoriesArr.length >= dataLen) {
                console.log("inside if");
                mutableStoriesArr = [];
              }
              mutableStoriesArr.push(story);
              this.setState({ stories: storiesArr });
              console.log(mutableStoriesArr);
              // this.setState({stories: JSON.parse(this.storiesArr)})
            });
        });
      })
      .catch(console.log);
  }

  render() {
    const datamap =
      mutableStoriesArr && mutableStoriesArr.map((i) => JSON.parse(i));
      console.log(datamap);
    return (
      <div>
        <div class="pa4">
          <div class="overflow-auto">
            <table class="f6 w-100 mw8 center wrapper" cellspacing="0">
              <tbody class="lh-copy">
                {datamap.map((data, i) => (
                  <tr class="stripe-dark">
                    {data && data.id && (
                      <td key={data.id} className="pa3">
                        <span>
                          <b>
                            {runningIndex <= data.length ? (
                              <span>
                                <b>{i + 1}.</b>
                              </span>
                            ) : (
                              <span>
                                <b>{runningIndex - data.length + i + 1}.</b>
                              </span>
                            )}
                          </b>
                        </span>
                        {data && data.title && (
                          <p className="para">
                            <b>{data.title} </b>
                          </p>
                        )}
                        {data && data.url && (
                          <span>
                            <i>
                              {data.url
                                ? data.url.split("/")[2]
                                : "Error : Link Not Found"}{" "}
                            </i>
                          </span>
                        )}
                        <div>
                          {data.url && (
                            <div className="link">
                              <a
                                target="_blank"
                                href={data.url}
                                class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-dark-green"
                              >
                                Check Job
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
                <tr class="stripe">
                  <a
                    href="#"
                    onClick={() =>
                      this.getNextPage(runningIndex, runningIndex + limit)
                    }
                    class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-red"
                  >
                    More
                  </a>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Jobs;
