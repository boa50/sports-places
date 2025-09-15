import type { Review } from '@/types'
import { getRelativeTime, averageReviews } from './index'

test('average reviews with zero reviews', () => {
    const result = averageReviews([])

    expect(result).toBe(0)
})

test('average reviews with one review', () => {
    const result = averageReviews([testCreateReview(3)])

    expect(result).toBe(3)
})

test('average reviews with many reviews', () => {
    const scores = [3, 4, 5, 2, 3, 1, 5, 2, 5, 2]
    const sum = scores.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
    )
    const averageScore = sum / scores.length

    const result = averageReviews(
        scores.map((score) => testCreateReview(score))
    )

    expect(result).toBe(averageScore)
})

test('getRelativeTime with less than a day difference', () => {
    const testDate = new Date()
    testDate.setHours(testDate.getHours() - 23)

    const relativeTime = getRelativeTime(testDate)

    expect(relativeTime).toBe('a moment ago')
})

test('getRelativeTime with one day difference', () => {
    const testDate = new Date()
    testDate.setHours(testDate.getHours() - 30)

    const relativeTime = getRelativeTime(testDate)

    expect(relativeTime).toBe('a day ago')
})

test('getRelativeTime with many days difference and less than a week', () => {
    const testDate = new Date()
    testDate.setDate(testDate.getDate() - 2)

    const relativeTime = getRelativeTime(testDate)

    expect(relativeTime).toBe('2 days ago')
})

test('getRelativeTime with one week difference', () => {
    const testDate = new Date()
    testDate.setDate(testDate.getDate() - 8)

    const relativeTime = getRelativeTime(testDate)

    expect(relativeTime).toBe('a week ago')
})

test('getRelativeTime with many weeks difference and less than a month', () => {
    const testDate = new Date()
    testDate.setDate(testDate.getDate() - 27)

    const relativeTime = getRelativeTime(testDate)

    expect(relativeTime).toBe('3 weeks ago')
})

test('getRelativeTime with one month difference', () => {
    const testDate = new Date()
    testDate.setMonth(testDate.getMonth() - 1)

    const relativeTime = getRelativeTime(testDate)

    expect(relativeTime).toBe('a month ago')
})

test('getRelativeTime with many months difference and less than a year', () => {
    const testDate = new Date()
    testDate.setMonth(testDate.getMonth() - 11)

    const relativeTime = getRelativeTime(testDate)

    expect(relativeTime).toBe('11 months ago')
})

test('getRelativeTime with one year difference', () => {
    const testDate = new Date()
    testDate.setMonth(testDate.getMonth() - 15)

    const relativeTime = getRelativeTime(testDate)

    expect(relativeTime).toBe('a year ago')
})

test('getRelativeTime with many years difference', () => {
    const testDate = new Date()
    testDate.setFullYear(testDate.getFullYear() - 7)

    const relativeTime = getRelativeTime(testDate)

    expect(relativeTime).toBe('7 years ago')
})

function testCreateReview(rating: number): Review {
    return {
        experienceDate: new Date('2020-01-01'),
        userAvatarDescription: 'default',
        userDisplayName: 'Name',
        rating: rating,
    }
}
