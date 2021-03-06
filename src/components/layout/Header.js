import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { menuData } from "../../data/menuData"
import { MenuButton } from "../buttons/MenuButton"
import { MenuTooltip } from "../../tooltips/MenuTooltip"

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = React.useRef()
  const tooltipRef = React.useRef()

  const handleClick = e => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  const item = { title: "", icon: "/images/icons/hamburger.svg", link: "" }

  const handleClickOutside = e => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      !tooltipRef.current.contains(e.target)
    ) {
      setIsOpen(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <Wrapper>
      <Link to="/">
        <img src="/images/logos/logo.svg" />
      </Link>
      <MenuWrapper ref={ref}>
        {menuData.map((item, index) =>
          item.link === "/account" ? (
            <MenuButton item={item} key={index} onClick={e => handleClick(e)} />
          ) : (
            <MenuButton item={item} key={index} />
          )
        )}
        <HamburgerWrapper>
          <MenuButton item={item} onClick={e => handleClick(e)} />
        </HamburgerWrapper>
      </MenuWrapper>
      <div ref={tooltipRef}>
        <MenuTooltip isOpen={isOpen} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  display: grid;
  grid-template-columns: 44px auto;
  width: 100%;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;

  @media (max-width: 768px) {
    top: 30px;
  }
  @media (max-width: 450) {
    top: 20px;
    padding: 0 20px;
  }
`

const MenuWrapper = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(${menuData.length}, auto);

  @media (max-width: 768px) {
    > a {
      display: none;
    }
    grid-template-columns: auto;
  }
`
const HamburgerWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`
