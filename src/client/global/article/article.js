import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function Article(props) {
    return (
        <div>
            <ul className="cards">
                {props.articles && props.articles.map((article) => (
                    <li className="cards_item" key={article.flight_number}>
                        <div className="card">
                            <div className="card_wrapper">
                                <div className="card_image">
                                    <figure className="card-wrapper m-0">
                                    <LazyLoadImage
                                        alt={article.mission_name}
                                        src={article.links.mission_patch_small} // use normal <img> attributes as props
                                        />
                                        {/* <img
                                            src={article.links.mission_patch_small}
                                            alt={article.mission_name}
                                            className="ifbroken"
                                        /> */}
                                    </figure>
                                </div>
                                <div className="card_content">
                                    <h2 className="card_title">
                                        <strong>
                                            {article.mission_name} # {article.flight_number}
                                        </strong>
                                    </h2>
                                    <section className="mission">
                                        <h5 className="m-0">Mission Ids:</h5>
                                        <ul className="m-0 additional_info mission-ids">
                                            {article.mission_id.map((mid) => (
                                                <li key={mid}>{mid}</li>
                                            ))}
                                        </ul>
                                    </section>
                                    <section>
                                        <table className="additional_info">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <strong>Launch Year</strong>
                                                    </td>
                                                    <td className="items-l">:{article.launch_year}</td>
                                                </tr>
                                                <tr>
                                                    <td>Successful Launch</td>
                                                    <td className="items-l">:{article.launch_success!=null ? article?.launch_success.toString(): 'null'}</td>
                                                </tr>
                                                <tr>
                                                    <td>Successful landing</td>
                                                    <td className="items-l"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
