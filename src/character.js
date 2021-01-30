import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CharacterName from './character-name'
import CharacterImage from './character-image'
import CharacterDescription from './character-description'
import CharacterPlaceholder from './character-placeholder'
import Layout from './layout.js'
import api from './api'
import Next from './next'
import CharacterContext from './character-context'


const CharacterStyled = styled.div`
`

function Character({ match }) {
  const [character, setCharacter] = useState({})
  // el estado de cada character
  useEffect(() => {
    async function getCharacter() {
        // vamos a obterner en primer personaje de la series
      setCharacter(await api.getCharacter(match.params.id || 1))
    }
    getCharacter()
  }, [match.params.id])
  // se asignan los datos que vienen de la api para retornarlos

  return (
    <CharacterStyled>
      <CharacterContext.Provider value={{
        character,
        setCharacter
      }}>
        <CharacterPlaceholder name={character.name} />
        <Layout
          next={<Next />}
          name={<CharacterName name={character.name} />}
          image={<CharacterImage image={character.image} name={character.name} />}
          description={<CharacterDescription gender={character.gender} species={character.species} status={character.status} />}
        />
      </CharacterContext.Provider>
    </CharacterStyled>
  );
}

export default Character