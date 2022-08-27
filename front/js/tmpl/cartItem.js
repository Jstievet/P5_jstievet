export default `
    <div class="cart__item__img">
        <img class="cart__item__img__content">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2 class="cart__item__title"></h2>
            <p class="cart__item__color"></p>
            <p class="cart__item__price"></p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté :<span class="cart__item__quantity"></span></p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>

`
