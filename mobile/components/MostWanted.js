import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import articlesActions from "../redux/actions/articlesActions";

const MostWanted = (props) => {

    const [mostVisitArticles, setMostVisitArticles] = useState([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      async function mostVisitArticles() {
        try {
          let response = await props.getMostVisitArticles()
          setMostVisitArticles(response.response)
          if (response.response) {
            setLoading(false)
          }
        } catch (err) {
          console.log(err)
        }
      }
      mostVisitArticles()
    }, [])

    if (loading) {
      return <AppLoading />
    }
    
  return (
    <>
      <Text style={styles.mainText}>Most wanted products</Text>
      <View>
        <ImageBackground style={styles.cardImg} source={{ uri: "https://i.postimg.cc/gJb32QpL/card2.png" }}>
          <ImageBackground style={styles.gameImg} source={{ uri: mostVisitArticles[0].iconPhotos }}></ImageBackground>
          <Text style={styles.gameName}>{mostVisitArticles[0].name}</Text>
        </ImageBackground>
      </View>
      <View>
        <ImageBackground style={styles.cardImg} source={{ uri: "https://i.postimg.cc/gJb32QpL/card1.png" }}>
          <ImageBackground style={styles.gameImg} source={{ uri: mostVisitArticles[1].iconPhotos }}></ImageBackground>
          <Text style={styles.gameName}>{mostVisitArticles[1].name}</Text>
        </ImageBackground>
      </View>
      <View>
        <ImageBackground style={styles.cardImg} source={{ uri: "https://i.postimg.cc/gJb32QpL/card2.png" }}>
          <ImageBackground style={styles.gameImg} source={{ uri: mostVisitArticles[2].iconPhotos}}></ImageBackground>
          <Text style={styles.gameName}>{mostVisitArticles[2].name}</Text>
        </ImageBackground>
      </View>
    </>
  );
};

const mapDispatchToProps = {
  getMostVisitArticles: articlesActions.getMostVisitArticles
}

export default connect(null,mapDispatchToProps)(MostWanted)

// const mapDispatchToProps = {
//   getMostVisitArticles: articlesActions.getMostVisitArticles,
// }

// export default connect(null, mapDispatchToProps)(MostWanted)

const styles = StyleSheet.create({
  mainText: {
    color: "white",
    fontSize: 18,
    paddingTop: 20,
    alignSelf: 'center',
    fontFamily: 'Poppins_700Bold'
  },
  cardImg: {
    width: 300,
    height: 300,
  },
  gameImg: {
    width: 275,
    height: 275,
    alignSelf: 'center',
  },
  gameName: {
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      position: 'relative',
      bottom: 43,
      fontFamily: 'Poppins_700Bold'
  }
});