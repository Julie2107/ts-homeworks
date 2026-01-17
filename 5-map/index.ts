type Entry = {
  key: any;
  value: any;
  next?: Entry;
};

type Bucket = Entry | undefined;

class CustomMap {
  private primitiveBuckets: Entry[][];
  private objectEntries: Entry[];

  constructor(bucketCount = 16) {
    this.primitiveBuckets = Array.from({ length: bucketCount }, () => []);
    this.objectEntries = [];
  }

  hashPrimitive(key: any): number {
    if (typeof key === 'number') return key | 0;
    if (typeof key === 'boolean') return key ? 1 : 0;
    if (key === null) return 0;
    if (key === undefined) return 1;

    // string
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) | 0;
    }
    return hash;
  }

  set(key: any, value: any) {
    if (typeof key === 'object' && key !== null) {
      this.setObject(key, value);
    } else {
      this.setPrimitive(key, value);
    }
  }

  private setPrimitive(key: any, value: any) {
    const hash = this.hashPrimitive(key);
    const index = Math.abs(hash) % this.primitiveBuckets.length;
    const bucket = this.primitiveBuckets[index];

    for (const entry of bucket) {
      if (Object.is(entry.key, key)) {
        entry.value = value;
        return;
      }
    }

    bucket.push({ key, value });
  }

  private setObject(key: object, value: any) {
    for (const entry of this.objectEntries) {
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }

    this.objectEntries.push({ key, value });
  }

  get(key: any) {
    if (typeof key === 'object' && key !== null) {
      for (const entry of this.objectEntries) {
        if (entry.key === key) return entry.value;
      }
      return undefined;
    }

    const hash = this.hashPrimitive(key);
    const index = Math.abs(hash) % this.primitiveBuckets.length;
    const bucket = this.primitiveBuckets[index];

    for (const entry of bucket) {
      if (Object.is(entry.key, key)) return entry.value;
    }

    return undefined;
  }

  delete(key: any): boolean {
    if (typeof key === 'object' && key !== null) {
      const index = this.objectEntries.findIndex((e) => e.key === key);
      if (index === -1) return false;
      this.objectEntries.splice(index, 1);
      return true;
    }

    const hash = this.hashPrimitive(key);
    const bucketIndex = Math.abs(hash) % this.primitiveBuckets.length;
    const bucket = this.primitiveBuckets[bucketIndex];

    const entryIndex = bucket.findIndex((e) => Object.is(e.key, key));
    if (entryIndex === -1) return false;

    bucket.splice(entryIndex, 1);
    return true;
  }

  clear(): void {
    for (let i = 0; i < this.primitiveBuckets.length; i++) {
      this.primitiveBuckets[i].length = 0;
    }

    this.objectEntries.length = 0;
  }
}
