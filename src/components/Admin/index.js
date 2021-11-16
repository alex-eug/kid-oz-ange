import './style.css'
import { Icon } from 'semantic-ui-react'
import { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router';
export default function Admin() {

    const history = useHistory()
    const [activities, setActivities] = useState([]);
    const [comments, setComments] = useState([]);


    const token = localStorage.getItem("token");


    useEffect(() => {
        axios.get("https://kidozanges.herokuapp.com/admin", {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setActivities(response.data.activity)
                setComments(response.data.comment)

            })
            .catch((error) => {
                console.error(error)
            })
    }, [token]);

    const getNotCertifiedActivities = () => {
        const rows = [];
        console.log("no activity", activities)
        if (!Array.isArray(activities)) {
            rows.push(<p>{activities}</p>)
        } else {
            for (const activity of activities) {
                rows.push(
                    <article className="box-activites">
                        <div className="box-text">
                            <h4>{activity.title}</h4>
                            <p>{activity.description}</p>

                        </div>
                        <div className="box-icon">
                            <Icon color="green" name='check circle' onClick={() => validateActivity(activity.id)} />
                            <Icon color="red" name='close' onClick={() => deleteActivity(activity.id)} />
                        </div>
                    </article>
                )
            }
        }


        return rows;
    };

    const getReportedComments = () => {
        const rows = [];
        console.log("no comments", comments)
        if (!Array.isArray(comments)) {
            rows.push(<p>{comments}</p>)
        } else {
            for (const comment of comments) {
                console.log("TEST  ICI")
                console.log(comment.id)
                rows.push(
                    <article className="box-activites" key={comment.id}>
                        <div className="box-text">
                            <h4>{comment.description}</h4>
                            <p>{comment.nickname}</p>

                        </div>
                        <div className="box-icon">
                            <Icon color="green" name='check circle' onClick={() => validateComment(comment.id)} />
                            <Icon color="red" name='close' onClick={() => deleteComment(comment.id)} />
                        </div>
                    </article>
                )
            }
        }


        return rows;
    };

    // const getReportedComments = () => {
    //     const rows = [];

    // }

    const validateActivity = async (activityId) => {
        try {
            await axios.patch(`https://kidozanges.herokuapp.com/admin/updateactivity`, { certify: 'true' }, {
                params: {
                    id: activityId
                },
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })

            window.location.reload()

        } catch (error) {
            console.error(error)
        }

    };

    const deleteActivity = async (activityId) => {
        try {
            await axios.delete("https://kidozanges.herokuapp.com/admin/deleteactivity", {
                params: {
                    id: activityId
                },
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
        } catch (error) {
            console.error(error)
        }
    };

    const validateComment = async (commentId) => {
        try {
            await axios.patch(`https://kidozanges.herokuapp.com/admin/acceptcomment`, { report: 'false' }, {
                params: {
                    id: commentId
                },
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })

            window.location.reload()

        } catch (error) {
            console.error(error)
        }

    };

    const deleteComment = async (commentId) => {
        try {
            await axios.delete("https://kidozanges.herokuapp.com/admin/deletecomment", {
                params: {
                    id: commentId
                },
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
        } catch (error) {
            console.error(error)
        }
    };


    return (
        <main id="admin">
            <h1>Page Admin</h1>
            <nav>
                <a href="#not-certified-activities">Activites</a>
                <a href="#reported-comments">Commentaires</a>
            </nav>
            <div className="box-autho">
                <section className="box--admin activites">
                    <h3 id="not-certified-activities">Activites</h3>

                    {getNotCertifiedActivities()}

                </section>

                <section className="box--admin comment">
                    <h3 id="reported-comments">Commentaire report</h3>
                    <div className="box--admin activites">
                        {getReportedComments()}
                    </div>
                </section>
            </div>
        </main>
    )
}