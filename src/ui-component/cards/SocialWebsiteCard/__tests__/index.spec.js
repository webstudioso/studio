import {cleanup, screen, render} from '@testing-library/react'
import SocialWebsiteCard from 'ui-component/cards/SocialWebsiteCard'

describe('SocialWebsiteCard', () => {

    afterEach(cleanup)

    it('renders image, title, description and url', () => {
        render(<SocialWebsiteCard  image="image" title="title" description="description" url="url"/>)
        expect(screen.getByText('title')).toBeTruthy()
        expect(screen.getByText('description')).toBeTruthy()
        expect(screen.getByText('url')).toBeTruthy()
    })
})