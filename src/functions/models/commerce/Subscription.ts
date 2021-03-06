import { Doc, Field, Timestamp, firestore, CollectionReference } from '@1amageek/ballcap-admin'
import SubscriptionItem from './SubscriptionItem'
import { Interval } from './Plan'

export default class Subscription extends Doc {

	static collectionReference(): CollectionReference {
		return firestore.collection('commerce/v1/subscriptions')
	}

	@Field subscribedBy!: string
	@Field publishedBy!: string
	@Field createdBy!: string
	@Field isCancelled: boolean = false
	@Field interval: Interval = 'month'
	@Field intervalCount: number = 1
	@Field quantity: number = 0
	@Field canceledAt?: Timestamp
	@Field cancelAtPeriodEnd: boolean = false
	@Field items: SubscriptionItem[] = []
	@Field status: SubscriptionStatus = 'incomplete'
	@Field trial?: Period
	@Field result?: any
	@Field metadata?: any
	@Field startDate!: Timestamp
	@Field endedAt?: Timestamp
}

export type Period = {
	start: Timestamp
	end: Timestamp
}

export type SubscriptionStatus = 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid'
