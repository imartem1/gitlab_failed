import React from 'react';

const EditView = function () {
    return (
        <div>
            <div className="edit_view">
                <div className="visibility">
                    <input type="checkbox" id="see" name="see"/>
                        <label htmlFor="see">Видимость</label>
                </div>

                <div className="brightness">
                    <input type="range" id="bright" name="bright"/>
                        <label htmlFor="bright">Яркость</label>
                </div>

                <div className="transparency">
                    <input type="range" id="transparency" name="transparency"/>
                        <label htmlFor="transparency">Прозрачность</label>
                </div>

                <div className="colorback">
                    <input type="color" id="transparency" name="transparency"/>
                        <label htmlFor="transparency">Цвет фона</label>
                </div>
            </div>
        </div>
    );
};

export default EditView;