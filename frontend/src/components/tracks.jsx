import React from 'react';

const Tracks = function (){
    return (
        <div>
            <div className="search_tracks">
                <div className="track">
                    <input type="checkbox" id="first" name="first"/>
                    <label htmlFor="first">Первый тракт</label>
                </div>
                <div className="track">
                    <input type="checkbox" id="second" name="second"/>
                    <label htmlFor="second">Второй тракт</label>
                </div>
                <div className="track">
                    <input type="checkbox" id="third" name="third"/>
                    <label htmlFor="third">Третий тракт</label>
                </div>
                <div className="track">
                    <input type="checkbox" id="second" name="second"/>
                    <label htmlFor="second">Четвёртый тракт</label>
                </div>
                <div className="track">
                    <input type="checkbox" id="second" name="second"/>
                    <label htmlFor="second">Пятый тракт</label>
                </div>
                <div className="track">
                    <input type="checkbox" id="second" name="second"/>
                    <label htmlFor="second">Шестой тракт</label>
                </div>
                <div className="track">
                    <input type="checkbox" id="second" name="second"/>
                    <label htmlFor="second">Седьмой тракт</label>
                </div>
            </div>
        </div>
    );
};

export default Tracks;