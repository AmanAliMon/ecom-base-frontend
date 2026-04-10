import React from 'react';
import styles from './Home.styles';




const CartButton = ({onClick,Text="Add to Cart",className="",variant=""}) => {
    return                             <button onClick={onClick}
                    style={variant == "fill" ? styles.productButtonFilled : styles.productButton} className={className}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = variant == "fill" ? "#fff" : "#1a1a1a";
                      e.currentTarget.style.color = variant == "fill" ? "#1a1a1a" : "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =  variant != "fill" ? "#fff" : "#1a1a1a";
                      e.currentTarget.style.color = variant != "fill" ? "#1a1a1a" : "white";
                    }}
                  >
                 {Text}
                  </button>
}


const Primary = ({onClick,Text,className="",variant=""}) => {
    return                             <button onClick={onClick}
                    style={variant == "fill" ? styles.primaryButtonFilled : styles.primaryButton} className={className}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =( variant == "fill") ? "#fff" : "#1a1a1a";
                      e.currentTarget.style.color =( variant == "fill") ? "#1a1a1a" : "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = variant != "fill" ? "#fff" : "#1a1a1a";
                      e.currentTarget.style.color = variant != "fill" ? "#1a1a1a" : "white";
                    }}
                  >
                 {Text}
                  </button>
}


let Buttons = {CartButton:CartButton,Primary:Primary}

export default Buttons;
