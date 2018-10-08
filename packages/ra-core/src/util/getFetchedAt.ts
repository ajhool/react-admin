import { pickBy } from 'lodash';

const defaultCacheDuration = 10 * 60 * 1000; // ten minutes

export default (
    newRecordIds = [] as number[],
    oldRecordFetchedAt = {},
    now: Date = new Date(),
    cacheDuration: number = defaultCacheDuration
) => {
    // prepare new records and timestamp them
    const newFetchedAt = newRecordIds.reduce(
        (prev, recordId) => ({
            ...prev,
            [recordId]: now,
        }),
        {}
    );
    // remove outdated entry
    const latestValidDate = new Date();
    latestValidDate.setTime(latestValidDate.getTime() - cacheDuration);

    const stillValidFetchedAt = pickBy(
        oldRecordFetchedAt,
        (date: Date) => date > latestValidDate
    );

    return {
        ...stillValidFetchedAt,
        ...newFetchedAt,
    };
};
