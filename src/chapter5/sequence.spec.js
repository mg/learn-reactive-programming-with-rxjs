import { expect } from 'chai'
import Rx from 'rx'

import sequence from './sequence.js'

const onNext= Rx.ReactiveTest.onNext
const onCompleted= Rx.ReactiveTest.onCompleted
const subscribe= Rx.ReactiveTest.subscribe

describe('chapter5/sequence ->', () => {
  it('runs through sequence', () => {
    let scheduler= new Rx.TestScheduler()
    let quakes= scheduler.createHotObservable(
      onNext(100, { properties: 1}),
      onNext(300, { properties: 2}),
      onNext(550, { properties: 3}),
      onNext(750, { properties: 4}),
      onNext(1000, { properties: 5}),
      onCompleted(1100)
    )

    const results= scheduler.startScheduler(
      () => sequence(quakes, scheduler),
      {created: 0, subscribed: 0, disposed: 1200},
    )

    const messages= results.messages

    expect(messages[0].toString()).to.equal(onNext(501, [1, 2]).toString())
    expect(messages[1].toString()).to.equal(onNext(1001, [3, 4, 5]).toString())
    expect(messages[2].toString()).to.equal(onCompleted(1100).toString())
  })
})
